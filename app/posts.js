/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');
export default class TumblrProject extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  componentDidMount () {
    this.getPostsFromApiAsync();
  }
  // onEndReached  = () => {
  //   alert('Lol infinite scrolling!')
  // }
  getPostsFromApiAsync = () => {
    return fetch('https://api.tumblr.com/v2/blog/xkcn.info/posts/photo?api_key=Q6vHoaVm5L1u2ZAW1fqv3Jw48gFzYVg9P0vH0VHl3GVy6quoGV')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.response.posts)
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View style={{flex:1}}>
      <ListView
        style={{flex:1}}
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        enableEmptySections
        pageSize={2}
        //onEndReached={this.onEndReached()}
        //initialListSize={1}
        renderRow={(rowData) =>
        <Image
          style={styles.item}
          source={{uri: rowData.photos[0].alt_sizes[4].url}}
          //source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}

        />
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  item: {
    width: width/2,
    height: width/2,
    // width: 50,
    // height: 50,
    //backgroundColor: 'black'
  }
});
