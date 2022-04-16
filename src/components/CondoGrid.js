import React from "react"
import { Table } from "semantic-ui-react"

const DataTable = ({ condoData }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Locality</Table.HeaderCell>
          <Table.HeaderCell>neighbourhood_name</Table.HeaderCell>
          <Table.HeaderCell>Home Type</Table.HeaderCell>
          <Table.HeaderCell>Asking Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {condoData.map((c, index) => (
          <Table.Row key={`condo_${index}`}>
            <Table.Cell>{c.locality_name}</Table.Cell>
            <Table.Cell>{c.neighbourhood_name}</Table.Cell>
            <Table.Cell>{c.home_type}</Table.Cell>
            <Table.Cell>{c.asking_price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <span> Bye </span>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

const CondoGrid = () => {
  const [condoData, setCondoData] = React.useState([])

  const getCondoData = async () => {
    const options = {
      header: {
        "User-Agent": "PostmanRuntime/7.26.8",
      },
    }
    const res = await fetch("https://api.condos.ca/v1/listings", options)
    const condos = await res.json()
    console.log(condos)
    setCondoData(condos)
  }

  React.useEffect(() => {
    getCondoData()
  }, [])

  return (
    <div>
      <h3> Condo Grid </h3>
      <DataTable condoData={condoData.data || []} />
    </div>
  )
}

export default CondoGrid
