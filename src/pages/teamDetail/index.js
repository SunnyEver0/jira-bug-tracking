import React, { Component } from 'react';
import './index.less'
import {GridContent} from '../../components/PageHeaderWrapper/GridContent';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown
} from 'antd';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
  Radar,
  TagCloud,
  Gauge
} from '../../components/charts';
import numeral from "numeral";
import {observer, inject} from "mobx-react/index";

const {TabPane} = Tabs;


@observer
@inject("homeStore")
export class TeamDetail extends Component {

  constructor(props) {
    super(props)
    this.rankingListData = [];
    this.pickerList = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: i + '月',
        total: 323234,
      });
    }
  }

  isActive(type) {
    if (type === this.state.rangePickerValue) return 'currentDate'
  }

  state = {
    rangePickerValue: 0
  }

  selectDate = index => {
    this.setState({
      rangePickerValue: index
    })
  }

  render () {
    const loading = false

    const salesPieData = [
      {x: "家用电器", y: 4544},
      {x: "食用酒水", y: 3321},
      {x: "个护健康", y: 3113},
      {x: "服饰箱包", y: 2341},
      {x: "母婴产品", y: 1231},
      {x: "其他", y: 1231}
    ]
    const salesData = [
      {x: "1月", y: 1117},
      {x: "2月", y: 861},
      {x: "3月", y: 936},
      {x: "4月", y: 684},
      {x: "5月", y: 1025},
      {x: "6月", y: 583},
      {x: "7月", y: 837},
      {x: "8月", y: 560},
      {x: "9月", y: 655},
      {x: "10月", y: 258},
      {x: "11月", y: 402},
      {x: "12月", y: 364}
    ]

    const salesExtra = (
      <div className={'salesExtraWrap'}>
        <div className={"salesExtra"}>
          {this.pickerList.map((type, index) => (
            <a className={this.isActive(index)} onClick={() => this.selectDate(index)} key={index}>
              {type}
            </a>
          ))}
        </div>
      </div>
    );

    return (
      <GridContent>
        <div style={{marginTop: "24px"}}>
          <Row gutter={24}>
            <Col xl={24} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card
                title={'bug总体情况'}
                bordered={false}
                className={"team-detail-pieCard"}
              >
                <Row style={{ padding: '16px 0' }}>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      percent={28}
                      subTitle={'UIBug'}
                      total="28%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#5DDECF"
                      percent={22}
                      subTitle={'ServiceBug'}
                      total="22%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                  <Col span={8}>
                    <Pie
                      animate={false}
                      color="#2FC25B"
                      percent={32}
                      subTitle={'Other'}
                      total="32%"
                      height={128}
                      lineWidth={2}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>


        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={"salesCard"}
              bordered={false}
              title={'Bug类型占比'}
              bodyStyle={{padding: 24}}
              style={{marginTop: 24, minHeight: 509}}
            >
              <h4 style={{marginTop: 8, marginBottom: 32}}>
                数据比例
              </h4>
              <Pie
                hasLegend
                subTitle={"Bug数量"}
                total={() => <div>1000000</div>}
                data={salesPieData}
                valueFormat={value => <div>100000</div>}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={"salesCard"}
              bordered={false}
              title={'Bug状态占比'}
              bodyStyle={{padding: 24}}
              style={{marginTop: 24, minHeight: 509}}
            >
              <h4 style={{marginTop: 8, marginBottom: 32}}>
                数据比例
              </h4>
              <Pie
                hasLegend
                subTitle={"Bug数量"}
                total={() => <div>1000000</div>}
                data={salesPieData}
                valueFormat={value => <div>100000</div>}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{padding: 0, marginBottom: '24px'}}>
          <div className={"salesCard"}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
              <TabPane
                tab={'各月Bug产出'}
                key="sales"
              >
                <Row className={"ixxixi"}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={"salesBar"}>
                      <Bar
                        height={295}
                        title={"Bug数量"}
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={"salesRank"}>
                      <h4 className={"rankingTitle"}>
                        各月bug产出排行榜
                      </h4>
                      <ul className={"rankingList"}>
                        {this.rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${"rankingItemNumber"} ${
                                i < 3 ? "home-sale-active" : ''
                                }`}
                            >
                              {i + 1}
                            </span>
                            <span className={"rankingItemTitle"} title={item.title}>
                              {item.title}
                            </span>
                            <span className={"rankingItemValue"}>
                              {numeral(item.total).format('0,0')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col xl={18} lg={24} sm={24} xs={24} style={{ marginBottom: 24, height: '100%' }}>
            <Card
              title={'总体评分'}
              bordered={false}
              className={"team-detail-pieCard"}
            >
              <Row style={{ padding: '16px 0', height: 180 }}>
                <div>原来很多网友都有过“冲动性”消费的行为，认为不花点钱对不起双十一这个节日，最后幡然醒悟！还有些退款或许是因为商品质量的问题，认为购买网上商品还是不足实体店更让人安心，因此更愿意选择在线下的实体店购买商品，因为毕竟眼见为实，质量也更有保障。由此看来，退款多也就不足为奇了。</div>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title={'最终评分'}
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title={'分数'}
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    )
  }
}
