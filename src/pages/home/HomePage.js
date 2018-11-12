import {inject, observer} from 'mobx-react';
import numeral from 'numeral';

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
  Dropdown,
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
  Radar
} from '../../components/charts';
import Trend from '../../components/Trend';
import React, {Component} from 'react';
import {GridContent} from '../../components/PageHeaderWrapper/GridContent';
import './HomePage.less'

const {TabPane} = Tabs;

@inject('analysisStore')
@observer
export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rangePickerValue: 0,
      salesType: 0
    };
    this.pickerList = ['每年', '每月', '每周', '每日'];
    this.salesType = ['全部渠道', '线桑', '门店']
    this.rankingListData = [];
    for (let i = 0; i < 7; i += 1) {
      this.rankingListData.push({
        title: '看见你笑了' + i,
        total: 323234,
      });
    }
  }

  componentDidMount() {
    this.props.analysisStore.setAnalysisData();
  }

  isActive(type) {
    if (type === this.state.rangePickerValue) return 'currentDate'
  }

  selectDate = index => {
    this.setState({
      rangePickerValue: index
    })
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  }

  render() {

    console.log(this.props, '---props')

    const radarOriginData = [
      {
        name: '个人',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7,
      },
      {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
      },
      {
        name: '部门',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
      },
    ];


    const radarData = [];
    const radarTitleMap = {
      ref: '引用',
      koubei: '口碑',
      output: '产量',
      contribute: '贡献',
      hot: '热度',
    };
    radarOriginData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'name') {
          radarData.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key],
          });
        }
      });
    });


    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: {marginBottom: 24}
    };

    const salesPieData = [
      {x: "家用电器", y: 4544},
      {x: "食用酒水", y: 3321},
      {x: "个护健康", y: 3113},
      {x: "服饰箱包", y: 2341},
      {x: "母婴产品", y: 1231},
      {x: "其他", y: 1231}
    ]

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );


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

    const {propsLoading} = this.props;
    const {stateLoading} = this.state;
    const loading = propsLoading || stateLoading;

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


    let {visitData} = this.props.analysisStore.chartData;
    if (visitData && visitData.length) {
      // mobx的obseverable数组，Array.isArray返回为false，需重新转换为真正的数组
      visitData = visitData.slice();
    }

    const iconGroup = (
      <span className={"iconGroup"}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis"/>
        </Dropdown>
      </span>
    );

    return (
      <GridContent>
        <div style={{marginTop: "24px"}}>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title={'总销售量'}
                action={
                  <Tooltip
                    title={'产品分析'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                loading={loading}
                total={() => <div style={{lineHeight: "38px"}}>126560</div>}
                footer={
                  <Field
                    label={'日销售量'}
                    value={`￥${numeral(12423).format('0,0')}`}
                  />
                }
                contentHeight={46}
              >
                <Trend flag="up" style={{marginRight: 16}}>
                  周同比
                  <span className={"trendText"}>12%</span>
                </Trend>
                <Trend flag="down">
                  日同比
                  <span className={"trendText"}>11%</span>
                </Trend>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={'访问量'}
                action={
                  <Tooltip
                    title={'访问量'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                total={numeral(8846).format('0,0')}
                footer={
                  <Field
                    label={'日访问量'}
                    value={numeral(1234).format('0,0')}
                  />
                }
                contentHeight={46}
              >
                <MiniArea color="#975FE4" data={visitData}/>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={'支付笔数'}
                action={
                  <Tooltip
                    title={'支付笔数'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                total={numeral(6560).format('0,0')}
                footer={
                  <Field
                    label={'转化率'}
                    value="60%"
                  />
                }
                contentHeight={46}
              >
                <div style={{position: 'relative', top: '-31px'}}>
                  <MiniBar data={visitData}/>
                </div>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                loading={loading}
                bordered={false}
                title={'运营活动效果'}
                action={
                  <Tooltip
                    title={'运营活动效果'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                total="78%"
                footer={
                  <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                    <Trend flag="up" style={{marginRight: 16}}>
                      周同比
                      <span className={"trendText"}>12%</span>
                    </Trend>
                    <Trend flag="down">
                      日同比
                      <span className={"trendText"}>11%</span>
                    </Trend>
                  </div>
                }
                contentHeight={46}
              >
                <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2"/>
              </ChartCard>
            </Col>
          </Row>
        </div>
        <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
          <div className={"salesCard"}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
              <TabPane
                tab={'买家'}
                key="sales"
              >
                <Row className={"ixxixi"}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={"salesBar"}>
                      <Bar
                        height={295}
                        title={"销售额"}
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={"salesRank"}>
                      <h4 className={"rankingTitle"}>
                        门店销售额排名
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
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <div>

            </div>

            <Card
              loading={loading}
              className={"salesCard"}
              bordered={false}
              title={'销售趋势分析'}
              bodyStyle={{padding: 24}}
              extra={
                <div className={"salesCardExtra"}>
                  {iconGroup}
                  <div className={"salesTypeRadio"}>
                    <Radio.Group value={this.state.salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value={0}>
                        {this.salesType[0]}
                      </Radio.Button>
                      <Radio.Button value={1}>
                        {this.salesType[1]}
                      </Radio.Button>
                      <Radio.Button value={2}>
                        {this.salesType[2]}
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{marginTop: 24, minHeight: 509}}
            >
              <ChartCard title="数据比例">
                <Radar
                  hasLegend
                  height={286}
                  data={radarData}
                />
              </ChartCard>
            </Card>

          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={"salesCard"}
              bordered={false}
              title={'销售趋势分析'}
              bodyStyle={{padding: 24}}
              extra={
                <div className={"salesCardExtra"}>
                  {iconGroup}
                  <div className={"salesTypeRadio"}>
                    <Radio.Group value={this.state.salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value={0}>
                        {this.salesType[0]}
                      </Radio.Button>
                      <Radio.Button value={1}>
                        {this.salesType[1]}
                      </Radio.Button>
                      <Radio.Button value={2}>
                        {this.salesType[2]}
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              }
              style={{marginTop: 24, minHeight: 509}}
            >
              <h4 style={{marginTop: 8, marginBottom: 32}}>
                销售额
              </h4>
              <Pie
                hasLegend
                subTitle={"默认销售额"}
                total={() => <div>1000000</div>}
                data={salesPieData}
                valueFormat={value => <div>100000</div>}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}



