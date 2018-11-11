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
    let { visitData } = this.props.analysisStore.chartData;
    if (visitData && visitData.length) {
      // mobx的obseverable数组，Array.isArray返回为false，需重新转换为真正的数组
      visitData = visitData.slice();
    }
    return (
      <GridContent>
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
              total={() => 126560}
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
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
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
              <MiniBar data={visitData} />
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
                    <span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日同比
                    <span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>
      </GridContent>
    );
  }
}
