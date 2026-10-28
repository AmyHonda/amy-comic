export const metadata = {
    title: '登場人物',
    description: '「好きって言わせてやる！」の登場人物を紹介するページです。',
    alternates: { canonical: '/characters' },
}

import Character from './characterList';
import '../../styles/character.css';

export default function Page() {
    return <Character />;
}