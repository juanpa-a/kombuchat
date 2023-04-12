import { useState } from 'react';

export const WelcomePage = ({ setUsername, setChannel }: { setUsername: Function, setChannel: Function }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleRoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoom(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsername(name)
    setChannel(room)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Kombuchat🍻</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label className="block mb-2 text-center">username</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="border border-gray-400 rounded py-2 px-4"
          />
          <label className="block mb-2 text-center">room</label>
          <input
            type="text"
            value={room}
            onChange={handleRoomChange}
            className="border border-gray-400 rounded py-2 px-4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          join
        </button>
      </form>
    </div>
  );
};

