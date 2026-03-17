"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [itemName, setItemName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [items, setItems] = useState<{name: string, place: string}[]>([]);

  const SaveItems = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/items?name=${itemName}&place=${placeName}`, {
        method: "POST",
      });

      if (response.ok) {
        setItemName("");
        setPlaceName("");
      } else {
        console.error("保存に失敗しました");
      }
    } catch (error) {
      console.error("データの保存に失敗しました", error);
    }
  };

  const FetchItems = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/items`, {
        method: "GET",
      });
      const data = await response.json();
      setItems(data);
    } catch(error) {
      console.error("データの取得に失敗しました", error);
    }
  }

  useEffect(() => {
    FetchItems();
  }, []);

  // 物と場所をリストに追加
  const addItem = () => {  
    if (itemName.trim() === "" || placeName.trim() === "") return;
    
    setItems([...items, {name: itemName, place: placeName}]);
    
    setItemName("")
    setPlaceName("")
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">私物管理アプリ</h1>
      
      {/*入力エリア*/}
      <div className="flex flex-col gap-4 mb-8 max-w-md">
        <input 
          className="border px-2 py-1 rounded text-black" 
          type="text" 
          placeholder="持ち物の名前を入力．．．" 
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input 
          className="border px-2 py-1 rounded text-black" 
          type="text" 
          placeholder="保管場所を入力．．．"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <button 
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={addItem}
        >
          追加する
        </button>
      </div>

      {/*リスト表示エリア*/}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-4">持ち物リスト</h2>
        <ul className="list-disc pl-5">
          {items.map((item, index) => (
            <li key={index} className="mb-1 text-gray-700">
              {item.name} - {item.place}
            </li> 
          ))}
        </ul>
      </div>
    </main>
  );
}
