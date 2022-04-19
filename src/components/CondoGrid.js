import React from "react";
import { Table, Icon, Menu, Tab } from "semantic-ui-react";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
function datediff(entrydate) {
  let today = new Date().toISOString().slice(0, 10);
  const endDate = today;
  const diffInMs = new Date(endDate) - new Date(entrydate);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays;
}

var baseurl = "https://condos.ca/";
const DataTable = ({ condoData }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Number</Table.HeaderCell>
          <Table.HeaderCell>URL</Table.HeaderCell>
          <Table.HeaderCell>Neighbourhood Name</Table.HeaderCell>
          <Table.HeaderCell>Home Type</Table.HeaderCell>
          <Table.HeaderCell>Asking Price</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Bedrooms</Table.HeaderCell>
          <Table.HeaderCell>Bathrooms</Table.HeaderCell>
          <Table.HeaderCell>Building age</Table.HeaderCell>
          <Table.HeaderCell>Parking spots</Table.HeaderCell>
          <Table.HeaderCell>Days on the market</Table.HeaderCell>
          <Table.HeaderCell>Offer</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {condoData.map((c, index) => (
          <Table.Row key={`condo_${index}`}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell>
              <Menu.Item
                href={baseurl + c.url}
                position="right"
                target="_blank"
              >
                <Icon link name="linkify" />
              </Menu.Item>
            </Table.Cell>
            <Table.Cell>{c.neighbourhood_name}</Table.Cell>
            <Table.Cell>{c.home_type}</Table.Cell>
            <Table.Cell>{formatter.format(c.asking_price)}</Table.Cell>
            <Table.Cell>{c.status}</Table.Cell>
            <Table.Cell>{c.bedrooms}</Table.Cell>
            <Table.Cell>{c.bathrooms}</Table.Cell>
            <Table.Cell>{c.building_age} year</Table.Cell>
            <Table.Cell>{c.parking_spots}</Table.Cell>
            <Table.Cell>{datediff(c.entry_date)} day</Table.Cell>
            <Table.Cell>{c.offer}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row></Table.Row>
      </Table.Footer>
    </Table>
  );
};

const CondoGrid = () => {
  const [condoData, setCondoData] = React.useState([]);
  const getCondoData = async () => {
    const options = {
      header: {
        "User-Agent": "PostmanRuntime/7.26.8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    // const res = await fetch("https://api.condos.ca/v1/listings", options)
    const res = await fetch("http://127.0.0.1:8000/listings", options);
    const condos = await res.json();
    console.log(condos);
    setCondoData(condos);
  };

  React.useEffect(() => {
    getCondoData();
  }, []);

  return (
    <div>
      <h1> Listings Table </h1>
      <DataTable condoData={condoData || []} />
    </div>
  );
};

export default CondoGrid;
