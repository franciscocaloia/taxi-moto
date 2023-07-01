export const DateFilter = ({ id, label, value, onChangeValue }) => {
  return (
    <div className="card max-w-xs bg-base-100 p-6 my-6 shadow-xl flex flex-col lg:m-6">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type="datetime-local"
        value={value}
        onChange={onChangeValue}
      />
    </div>
  );
};
