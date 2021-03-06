import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ArticleCard from './ArticleCard';
import PictureHeadlineArticle from './PictureHeadlineArticle';
import HeadlineArticle from './HeadlineArticle';
import FirstArticleCard from './FirstArticleCard';
import MainHeader from './MainHeader';
import Images from './assets';

class SportsList extends Component {
  constructor() {
    super();
    this.state = { articles: [], isLoading: true };
}

componentWillMount() {
  this.Mounted = true;
  this.fetchSports();
}

componentWillUnmount() {
  this.Mounted = false;
}

async fetchSports() {
    try {
      let response = await fetch('https://tuftsdaily.com/wp-json/wp/v2/posts?categories=27&per_page=20');
      let responseJson = await response.json();
      if (this.Mounted) {
        this.setState({ articles: responseJson, isLoading: false });
      }
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    const goBack = () => Actions.pop();
    if (this.state.isLoading) {
      return (
        <Text></Text>
      );
    }
    else {
      return (
        <View>
          <MainHeader page='sports'/>
          <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>
          <FirstArticleCard article= {this.state.articles[0]} />
          <ArticleCard>
            <PictureHeadlineArticle article={this.state.articles[1]} />
            <HeadlineArticle article={this.state.articles[2]} />
            <HeadlineArticle article={this.state.articles[3]}/>
            <PictureHeadlineArticle article={this.state.articles[4]} isLast={true}/>
          </ArticleCard>
          <ArticleCard>
            <PictureHeadlineArticle article={this.state.articles[5]} />
            <HeadlineArticle article={this.state.articles[6]} />
            <HeadlineArticle article={this.state.articles[7]}/>
            <PictureHeadlineArticle article={this.state.articles[8]} isLast={true}/>
          </ArticleCard>
          <ArticleCard>
            <PictureHeadlineArticle article={this.state.articles[9]} />
            <HeadlineArticle article={this.state.articles[10]} />
            <HeadlineArticle article={this.state.articles[11]}/>
            <PictureHeadlineArticle article={this.state.articles[12]} isLast={true}/>
          </ArticleCard>
          <ArticleCard>
            <PictureHeadlineArticle article={this.state.articles[13]} />
            <HeadlineArticle article={this.state.articles[14]} />
              <HeadlineArticle article={this.state.articles[15]}/>
            <PictureHeadlineArticle article={this.state.articles[16]} isLast={true}/>
          </ArticleCard>
        </ScrollView>
        <TouchableOpacity onPress={goBack} /*onPress={goToSectionList}*/ style={{position: 'absolute', left: 15, bottom: 100, justifyContent: 'center'}}>
          <Image source={Images.backarrow} style={{ height: 40, width: 40}} />
        </TouchableOpacity>
      </View>
      );
    }
  }
};

const styles = {
  sectionHeaderStyle: {
    marginTop: 20,
    marginLeft: 5,

  }
};

export default SportsList;
