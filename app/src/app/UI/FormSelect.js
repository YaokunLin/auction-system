export default function FormSelect({
    options,
    defaultSelected,
    valueKey,
    labelKey,
    className="",
    required,
    prompt,
    ...rest
}) {
 return<select {...rest} defaultValue={defaultSelected} className={`${className} border-2 border-gray-300`} required={required}>
 <option value="" disabled>{prompt}</option>
 {options && options.map((option) => (
   <option key={option[valueKey]} value={option[valueKey]}>
     {option[labelKey]}
   </option>
 ))}
</select>

}