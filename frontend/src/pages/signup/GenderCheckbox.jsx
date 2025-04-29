const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      {<pre>{selectedGender}</pre>}
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            checked={selectedGender === 'male'}
            className="checkbox border-slate-900"
            onChange={() => onCheckboxChange('male')}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${selectedGender === 'female' ? 'selected' : ''}`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            checked={selectedGender === 'female'}
            className="checkbox border-slate-900"
            onChange={() => onCheckboxChange('female')}
          />
        </label>
      </div>
    </div>
  )
}
export default GenderCheckbox
