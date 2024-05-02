export default function FormTextarea ({
    className="",
    ...rest
}) {
    return <textarea {...rest} className={`${className} shadow border-2 border-gray-300`}></textarea>
}