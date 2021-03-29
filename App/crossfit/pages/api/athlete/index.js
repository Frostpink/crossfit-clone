

const athletes = [
    { name: 'Athlete1', id: '1', gender: 'male', age: 30 },
    { name: 'Athlete2', id: '2', gender: 'female', age: 21 },
    { name: 'Athlete3', id: '3', gender: 'non-binary', age: 15 },
]

export default function handler(req, res) {
    res.status(200).json(athletes)
}