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
import { utils } from '../../utils/util'

const {TabPane} = Tabs;

@inject('homeStore')
@observer
export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      rangePickerValue: 0,
      salesType: 0
    };
    this.pickerList = [];
  }

  componentDidMount() {
    this.props.homeStore.initHomeData();
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
      ref: 'UI Bug',
      koubei: 'UI Function',
      output: 'xx1x',
      contribute: 'x2xx',
      hot: 'xxx3',
      hots: 'xx4x'
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
      xl: 8,
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


    let {visitData} = this.props.homeStore.chartData;
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
                title={'Bug总数'}
                action={
                  <Tooltip
                    title={'Bug总数'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                loading={loading}
                total={() => <div style={{lineHeight: "38px"}}>{this.props.homeStore.chartData.bugInfo.bugTotal}</div>}
                footer={
                  <Field
                    label={'日新增'}
                    value={`￥${numeral(12423).format('0,0')}`}
                  />
                }
                contentHeight={46}
              >
                <Trend flag="up" style={{marginRight: 16}}>
                  年新增
                  <span className={"trendText"}>12%</span>
                </Trend>
                <Trend flag="down">
                  月新增
                  <span className={"trendText"}>11%</span>
                </Trend>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={'Online Bug'}
                action={
                  <Tooltip
                    title={'Online Bug'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                total={this.props.homeStore.chartData.bugInfo.onLineBug}
                footer={
                  <Field
                    label={'当日 Online Bug'}
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
                title={'Bug'}
                action={
                  <Tooltip
                    title={'Bug'}
                  >
                    <Icon type="info-circle-o"/>
                  </Tooltip>
                }
                total={this.props.homeStore.chartData.bugInfo.notOnlineBug}
                footer={
                  <Field
                    label={'当日bug量'}
                    value={100}
                  />
                }
                contentHeight={46}
              >
                <div style={{position: 'relative', top: '-31px'}}>
                  <MiniBar data={visitData}/>
                </div>
              </ChartCard>
            </Col>
          </Row>
        </div>
        <Card loading={loading} bordered={false} bodyStyle={{padding: 0}}>
          <div className={"salesCard"}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{marginBottom: 24}}>
              <TabPane
                tab={'各月bug产出'}
                key="sales"
              >
                <Row className={"ixxixi"}>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={"salesBar"}>
                      <Bar
                        height={295}
                        title={"Bug数量"}
                        data={utils.transformData(this.props.homeStore.chartData.bugMonthList)}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={"salesRank"}>
                      <h4 className={"rankingTitle"}>
                        各月Bug产出排行
                      </h4>
                      <ul className={"rankingList"}>
                        {utils.getRankBugs(6).map((item, i) => (
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
            <Card
              loading={loading}
              className={"salesCard"}
              bordered={false}
              title={'Bug类型占比'}
              bodyStyle={{padding: 24}}
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
      </GridContent>
    );
  }
}



