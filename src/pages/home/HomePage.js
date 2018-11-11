import { inject, observer } from 'mobx-react';
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
} from '../../components/charts';
import Trend from '../../components/Trend';
import React, { Component } from 'react';
import { GridContent } from '../../components/PageHeaderWrapper/GridContent';
import styles from './HomePage.less'
const { TabPane } = Tabs;

@inject('analysisStore')
@observer
export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.analysisStore.setAnalysisData();
  }

  render() {

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 }
    };

    const { propsLoading } = this.props;
    const { stateLoading } = this.state;
    const loading = propsLoading || stateLoading;

    const salesExtra = (
      <div className={'salesExtraWrap'}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            每天
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            每周
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            每月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            每年
          </a>
        </div>
      </div>
    );


    let { visitData } = this.props.analysisStore.chartData;
    if (visitData && visitData.length) {
      // mobx的obseverable数组，Array.isArray返回为false，需重新转换为真正的数组
      visitData = visitData.slice();
    }
    return (
      <GridContent>
        <div style={{ marginTop: "24px" }}>
          <Row gutter={24}>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title={'总销售量'}
                action={
                  <Tooltip
                    title={'产品分析'}
                  >
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                loading={loading}
                total={() => <div style={{ lineHeight: "38px" }}>126560</div>}
                footer={
                  <Field
                    label={'日销售量'}
                    value={`￥${numeral(12423).format('0,0')}`}
                  />
                }
                contentHeight={46}
              >
                <Trend flag="up" style={{ marginRight: 16 }}>
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
                    <Icon type="info-circle-o" />
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
                contentStyle={{ height: "77px" }}
              >
                <MiniArea color="#975FE4" data={visitData} />
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
                    <Icon type="info-circle-o" />
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
                <div style={{ position: 'relative', top: '-31px' }}>
                  <MiniBar data={visitData} />
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
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total="78%"
                footer={
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    <Trend flag="up" style={{ marginRight: 16 }}>
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
                <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
              </ChartCard>
            </Col>
          </Row>
        </div>
        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={"salesCard"}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane
                tab={'买家'}
                key="sales"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={295}
                        title={"销售额"}
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        门店销售额排名
                      </h4>
                      <ul className={styles.rankingList}>
                        {this.rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                                }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span className={styles.rankingItemValue}>
                              {numeral(item.total).format('0,0')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab={<FormattedMessage id="app.analysis.visits" defaultMessage="Visits" />}
                key="views"
              >
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={292}
                        title={
                          <FormattedMessage
                            id="app.analysis.visits-trend"
                            defaultMessage="Visits Trend"
                          />
                        }
                        data={salesData}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        <FormattedMessage
                          id="app.analysis.visits-ranking"
                          defaultMessage="Visits Ranking"
                        />
                      </h4>
                      <ul className={styles.rankingList}>
                        {this.rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span
                              className={`${styles.rankingItemNumber} ${
                                i < 3 ? styles.active : ''
                                }`}
                            >
                              {i + 1}
                            </span>
                            <span className={styles.rankingItemTitle} title={item.title}>
                              {item.title}
                            </span>
                            <span>{numeral(item.total).format('0,0')}</span>
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
      </GridContent>
    );
  }
}
