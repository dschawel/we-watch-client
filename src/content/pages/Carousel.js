import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import search from './Search'

class MyCarousel extends Component {

    static get CARD_STYLE() {
        return {
        height: '200px',
        width: '200px',
        paddingTop: '80px',
        textAlign: 'center',
        background: '#52C0F5',
        color: '#FFF',
        fontSize: '12px',
        textTransform: 'uppercase',
        borderRadius: '10px',
        };
    }

    render() {
        return (
        <ReactCardCarousel autoplay={ true } autoplay_speed={ 2500 }>
            <div style={ MyCarousel.CARD_STYLE }>
            
            </div>
        </ReactCardCarousel>
        );
    }
}

export default MyCarousel;