import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyBALwdShhFbU0EwSx0Zu0UZPtukSK-T5WQ");
Geocode.enableDebug();
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }
    componentDidMount() {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.mapPosition.lat + ',' + this.state.mapPosition.lng + '&key=AIzaSyBALwdShhFbU0EwSx0Zu0UZPtukSK-T5WQ', {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
                if (data.results[1]) {
                    const address = data.results[0].formatted_address,
                        addressArray = data.results[0].address_components,
                        city = this.getCity(addressArray),
                        area = this.getArea(addressArray),
                        state = this.getState(addressArray);
                    this.props.handleAddress(data.results[0].formatted_address);
                    this.props.handlecityname(city);
                    this.props.handlepincode(area);
                    this.setState({
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    };
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city ||
            this.state.area !== nextState.area ||
            this.state.state !== nextState.state
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }
    }
   
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'locality' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('postal_code' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
    onInfoWindowClose = (event) => {
    };
    onPlaceSelected = (place) => {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const haldlat = {
            latitude: lat,
            longitude: lng
        }
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyBALwdShhFbU0EwSx0Zu0UZPtukSK-T5WQ', {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
                if (data.results[1]) {
                    const address = data.results[0].formatted_address,
                        addressArray = data.results[0].address_components,
                        city = this.getCity(addressArray),
                        area = this.getArea(addressArray),
                        state = this.getState(addressArray);
                    this.props.handleAddress(data.results[0].formatted_address);
                    this.props.handlecityname(city);
                    this.props.handlepincode(area);
                    this.props.handlelatlong(haldlat);
                    this.setState({
                        markerPosition: {
                            lat: lat,
                            lng: lng
                        },
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    };
    onMarkerDragEnd = (event) => {
        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();
        const haldlat = {
            latitude: newLat,
            longitude: newLng
        }
        fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + newLat + ',' + newLng + '&key=AIzaSyBALwdShhFbU0EwSx0Zu0UZPtukSK-T5WQ', {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data)
                if (data.results[1]) {
                    const address = data.results[0].formatted_address,
                        addressArray = data.results[0].address_components,
                        city = this.getCity(addressArray),
                        area = this.getArea(addressArray),
                        state = this.getState(addressArray);
                    this.props.handleAddress(data.results[0].formatted_address);
                    this.props.handlecityname(city);
                    this.props.handlepincode(area);
                    this.props.handlelatlong(haldlat);
                    this.setState({
                        markerPosition: {
                            lat: newLat,
                            lng: newLng
                        },
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                    })
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    };
    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '100px'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                        {/* <Circle
                            radius={1200}
                            center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                            onMouseover={() => console.log('mouseover')}
                            onClick={() => console.log('click')}
                            onMouseout={() => console.log('mouseout')}
                            strokeColor='transparent'
                            strokeOpacity={0}
                            strokeWeight={5}
                            fillColor='#FF0000'
                            fillOpacity={0.2}
                        /> */}
                        <Marker
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <Marker />
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                    </GoogleMap>
                )
            )
        );
        let map;
        if (this.props.center.lat !== undefined) {
            map = <div>
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBALwdShhFbU0EwSx0Zu0UZPtukSK-T5WQ&libraries=places"
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: this.props.height }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                />
            </div>
        } else {
            map = <div style={{ height: this.props.height }} />
        }
        return (map)
    }
}
export default Map