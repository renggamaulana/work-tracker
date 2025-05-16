interface Props {
    children: React.ReactNode
}
export default function FormControl({children}: Props) {
    return (
        <div className="flex flex-col gap-5">
            {children}
        </div>
    )
}