export default function FlexContainer(
    {
        children, 
        className=""
    }
) {
return <div className={`${className} flex flex-row gap-2 float-right `}>
    {children}
</div>
}