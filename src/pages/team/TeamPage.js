import './TeamPage.less';

import { Button, Card, Col, Icon, Input, List, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';


@inject('teamStore')
@observer
export class TeamPage extends PureComponent {
  state = {
    loading: false
  };

  componentDidMount() {
    this.props.teamStore.setTeamList();
  }

  handleSearch() {}
  render() {
    const list = this.props.teamStore.teamListData.slice();
    return (
      <div>
        <br />
        {/* 搜索栏 */}
        <Row>
          <Col span={8}>
            <Input.Search placeholder="请键入搜索条件" enterButton onSearch={this.handleSearch} />
          </Col>
        </Row>
        <br />
        <div className="cardList">
          <List
            rowKey="id"
            loading={this.state.loading}
            grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
            dataSource={[...list]}
            renderItem={item => (
              <List.Item key={item.id} onClick={() => this.props.history.push('/team/teamInfo')}>
                <Card hoverable className='card' actions={[<a key="op2">查看信息</a>]}>
                  <Card.Meta
                    avatar={<img alt="" className='cardAvatar' src={item.avatar} />}
                    title={<a href="">{item.title}</a>}
                    description={<p>{item.description}</p>}
                  />
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
