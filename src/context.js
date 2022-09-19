import React, {Component} from 'react';
import items from './data'
import Client from './Contentful'


const RoomContext = React.createContext()

// <RoomContext.Provider value={}
class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        pets: false,
        breakfast: false

    }

    //getData {}
    getData = async () => {
        try {
            let response = await Client.getEntries({
                content_type: "beachResort"
            })
            let rooms = this.formatData(response.items)
            //sorting rooms by featured state then adding this rooms to featuredRooms which was empty array
            let featuredRooms = rooms.filter((room) => room.featured === true)
            //getting max size and price from rooms object by Math.max method
            let maxPrice = Math.max(...rooms.map((item) => item.price))
            let maxSize = Math.max(...rooms.map((item) => item.size))

            //setting state with new sorted data
            this.setState({
                rooms,
                featuredRooms,
                sortedRooms: rooms,
                loading: false,
                price: maxPrice,
                maxPrice: maxPrice,
                maxSize: maxSize
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getData()
        //getting sorted data from function

    }

    //for formatting data, because we have complex data from contentful
    formatData(items) {
        let tempItems = items.map((item) => {
            let id = item.sys.id
            let images = item.fields.images.map((image) => image.fields.file.url)
            let room = {...item.fields, id, images}
            return room
        })
        return tempItems
    }

    //function for getting room information from data by its slug
    getRoom = slug => {
        let tempRooms = [...this.state.rooms]
        const room = tempRooms.find(room => room.slug === slug)
        return room

    }

    //getting values from form by event.target
    handleChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name
        this.setState({
            [name]: value
        }, this.filterRooms)
        //    apply handleChange to filterRooms
    }

    //filtering Rooms
    filterRooms = () => {
        // destructuring state
        let {
            rooms, type, capacity, price, minSize, maxSize, breakfast, pets
        } = this.state
        //all rooms
        let tempRooms = [...rooms]
        //transform value
        capacity = parseInt(capacity)


        //FILTER BY TYPE
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }

        //FILTER BY CAPACITY
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        //FILTER BY PRICE
        if (price !== 0) {
            tempRooms = tempRooms.filter(room => room.price <= price)
        }

        //FILTER BY SIZE
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)

        //FILTER BY BREAKFAST
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        //FILTER BY PETS
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }
        //set sortedRooms , change state
        this.setState({
            sortedRooms: tempRooms
        })
    }

    render() {
        return (
            //sending props to children using context
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>

        );
    }
}

/* A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part
 * of the React API, per se. They are a pattern that emerges from React’s compositional nature. Concretely, a
 * higher-order component is a function that takes a component and returns a new component. */

const RoomConsumer = RoomContext.Consumer

// This function takes a component...
export function withRoomConsumer(Component) {

    // ...and returns another component...
    return function ConsumerWrapper(props) {
        return (
            <RoomConsumer>
                {value => <Component {...props} context={value}/>}
            </RoomConsumer>
        )
    }
}

export {RoomProvider, RoomConsumer, RoomContext}