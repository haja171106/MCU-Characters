export const fetchCharacters = async () => {
    const response = await fetch('http://localhost:3001/characters');
    return await response.json();
  };
  
  export const createCharacter = async (character) => {
    const response = await fetch('http://localhost:3001/characters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character),
    });
    return await response.json();
  };
  
  export const updateCharacter = async (id, character) => {
    const response = await fetch(`http://localhost:3001/characters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(character),
    });
    return await response.json();
  };
  
  export const deleteCharacter = async (id) => {
    await fetch(`http://localhost:3001/characters/${id}`, { method: 'DELETE' });
  };