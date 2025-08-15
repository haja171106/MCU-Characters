import { useState, useEffect } from 'react';
import { fetchCharacters, createCharacter, updateCharacter, deleteCharacter } from './services/api';
import CharacterList from './components/CharacterList';
import CharacterForm from './components/CharacterForm';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    realName: '',
    universe: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    const data = await fetchCharacters();
    setCharacters(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.realName || !formData.universe) {
      alert('Tous les champs sont obligatoires !');
      return;
    }

    if (editing) {
      await updateCharacter(formData.id, formData);
    } else {
      await createCharacter(formData);
    }

    loadCharacters();
    setFormData({ id: '', name: '', realName: '', universe: '' });
    setEditing(false);
  };

  const handleEdit = (character) => {
    setFormData(character);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
      await deleteCharacter(id);
      loadCharacters();
    }
  };

  return (
    <div className="app">
      <h1>MCU Characters</h1>
      <CharacterForm
        formData={formData}
        editing={editing}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <CharacterList
        characters={characters}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;