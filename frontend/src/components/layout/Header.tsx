// src/components/layout/Header.tsx
interface HeaderProps {
    title: string;
    text?: string;
}

function Header({ title, text }: HeaderProps) {
    return (
        <div>
            <h1>{title}</h1>
            {text && <p>{text}</p>}
        </div>
    );
}

export default Header;