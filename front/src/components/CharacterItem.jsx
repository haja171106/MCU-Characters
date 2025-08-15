const CharacterItem = ({ character, onEdit, onDelete }) => {
  return (
    <li className="character-item">
      <div>
        <strong>{character.name}</strong> ({character.realName}) - {character.universe}
      </div>
      <div>
        <button onClick={() => onEdit(character)}>Update</button>
        <button onClick={() => onDelete(character.id)}>Delete</button>
      </div>
    </li>
  );
};

export default CharacterItem;