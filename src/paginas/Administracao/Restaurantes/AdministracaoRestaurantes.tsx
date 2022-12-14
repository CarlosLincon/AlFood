import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import htpp from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        htpp.get<IRestaurante[]>('restaurantes/')
            .then(resultado => {
                setRestaurantes(resultado.data)
                console.log(restaurantes)
            }).catch(resultado => {
                console.log(resultado)
            })
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        htpp.delete(`restaurantes/${restauranteAhSerExcluido.id}/`).then(() => {
            alert("O restaurante foi exluido");
            const listaRestaurante = restaurantes.filter(restaurantes => restaurantes.id !== restauranteAhSerExcluido.id)
            setRestaurantes([...listaRestaurante])
        })
    }

    return (


        <TableContainer component={(Paper)}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {restaurantes.map(item =>
                        <TableRow key={item.id}>
                            <TableCell >
                                {item.nome}
                            </TableCell>
                            <TableCell >
                                [<RouterLink to={`/admin/restaurantes/${item.id}`}>
                                    Editar
                                </RouterLink>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(item)}>Excluir</Button>
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default AdministracaoRestaurantes;