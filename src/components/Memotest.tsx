import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const IMAGENES = [
    "./imagenes/pikachu.png",
    "./imagenes/bullbasaur.png",
    "./imagenes/butterfly.png",
    "./imagenes/charmander.png",
    "./imagenes/dragonite.png",
    "./imagenes/eevee.png",
    "./imagenes/haunter.png",
    "./imagenes/mew.png",
    "./imagenes/mewtwo.png",
    "./imagenes/squirtle.png"
].flatMap((image) => [`a|${image}`, `b|${image}`]).sort(() => Math.random() - 0.5);

export default function Memotest() {
    const [guessed, setGuessed] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([])

    useEffect(() => {
        if (selected.length === 2) {
            if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
                setGuessed((guessed) => guessed.concat(selected))
            }
            setTimeout(() => setSelected([]), 1000)
        }
    }, [selected])

    useEffect(() => {
        if (guessed.length === IMAGENES.length) {
            Swal.fire({
                title: 'Felicidades!!! Has ganado',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            location.reload()
        }
    }, [guessed])
    return (
        <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))", gap: "24px" }}>
            {IMAGENES.map((imagen) => {
                const [, url] = imagen.split("|")
                return (
                    <div
                        className="card"
                        onClick={() => selected.length < 2 && setSelected(selected => selected.concat(imagen))}
                        key={imagen}
                        style={{ cursor: "pointer", border: "1px solid #999" }}
                    >
                        {selected.includes(imagen) || guessed.includes(imagen) ? (
                            <img src={url} alt="icon" />
                        ) : (
                            <img style={{ width: "100px", padding: "10px" }} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png" alt="icon" />
                        )}
                    </div>
                )
            })}
        </ul>
    )
}