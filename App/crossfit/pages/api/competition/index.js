

const competitions = [
    { name: 'Competition 1', id: '1' },
    { name: 'Competition 2', id: '2' },
    { name: 'Competition 3', id: '3' },
    { name: 'Competition 4', id: '4' },
]

export default function handler(req, res) {
    res.status(200).json(competitions)
}