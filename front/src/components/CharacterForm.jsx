const CharacterForm = ({ formData, editing, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nom du héros"
        value={formData.name}
        onChange={onChange}
      />
      <input
        type="text"
        name="realName"
        placeholder="Nom réel"
        value={formData.realName}
        onChange={onChange}
      />
      <input
        type="text"
        name="universe"
        placeholder="Univers"
        value={formData.universe}
        onChange={onChange}
      />
      <button type="submit">{editing ? 'Mettre à jour' : 'Ajouter'}</button>
    </form>
  );
};

export default CharacterForm;