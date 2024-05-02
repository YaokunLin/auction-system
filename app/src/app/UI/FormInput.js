
export default function FormInput ({
    className="",
    ...rest
}) {
    return <input 
    className={`${className} appearance border-2 border-gray-300 `} {...rest} />
}