import CharacterItem from './CharacterItem';

const CharacterList = ({ characters, onEdit, onDelete }) => {
  return (
    <ul className="character-list">
      {characters.map((character) => (
        <CharacterItem
          key={character.id}
          character={character}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default CharacterList;