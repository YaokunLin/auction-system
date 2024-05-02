export default function Button({
    children, 
    className="",
    ...rest
}) {
    return (
        <button {...rest} className={`${className} bg-gray-100 hover:bg-gray-300 text-black px-2 py-1 border border-gray-400`}>
            {children}
        </button>
    )
}