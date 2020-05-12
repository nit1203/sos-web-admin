const sosData = [
    {

        name: 'Nitin Singh',
        type: 'Driver',
        time: new Date().toISOString(),
        country: 'India',
        state: 'Maharashtra',
        city: 'Mumbai',
        tripNumber: '254'
    },
    {

        name: 'Raj Pawar',
        type: 'Passanger',
        time: new Date().toISOString(),
        country: 'India',
        state: 'Hyderabad',
        city: 'Chennai',
        tripNumber: '4562'
    }
]

const columns = [
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Type",
        accessor: "type"
    },
    {
        Header: "Time",
        accessor: "time"
    },
    {
        Header: "Country",
        accessor: "country"
    }, {
        Header: "State",
        accessor: "state"
    },
    {
        Header: "City",
        accessor: "city"
    },
    {
        Header: "Trip No.",
        accessor: "tripNumber"
    },

]


export { sosData, columns }