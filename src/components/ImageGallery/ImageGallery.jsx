import { Component } from 'react';
import * as API from 'services/api';

export class ImageGallery extends Component {

    // state = {
        
    // }
  async componentDidUpdate() {
    const images = await API.getImages('cat', 1);
    console.log(images);
  }
}
