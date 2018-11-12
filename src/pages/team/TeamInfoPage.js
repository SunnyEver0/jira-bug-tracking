import './TeamInfoPage.less';

import { Card, Tabs, Col, Avatar, Row, List, Button, Dropdown, Menu, Modal, Icon, Radio, Input, Form, Progress, DatePicker, Select } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import moment from 'moment';
import { Pie, TimelineChart } from '../../components/charts';
import NumberInfo from '../../components/numberInfo';
import Result from '../../components/result';
import { util } from '../../utils';
import { Link} from 'react-router-dom';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@Form.create()
@inject('homeStore', 'teamStore')
@observer
export class TeamInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentTabKey: '',
      current: {},
      done: false,
      visible: false
    };
  }

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    this.props.homeStore.initHomeData();
    this.props.teamStore.setTeamProjectData();
  }

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  showEditModal = () => {

  };

  handleDone = () => {

  };

  render() {
    const { propsLoading, homeStore, teamStore, form: { getFieldDecorator } } = this.props;
    const { stateLoading, currentTabKey, current, done, visible } = this.state;
    const loading = propsLoading || stateLoading;
    let { offlineData, offlineChartData } = homeStore.chartData;
    if (offlineData && offlineData.length > 0) offlineData = offlineData.slice();
    if (offlineChartData && offlineChartData.length > 0) offlineChartData = offlineChartData.slice();
    let { projectListData } = teamStore;
    const loading = propsLoading || stateLoading;
    offlineData = util.formatMobxArray(offlineData);
    offlineChartData = util.formatMobxArray(offlineChartData);
    projectListData = util.formatMobxArray(projectListData);
    const activeKey = currentTabKey || (offlineData && offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={18} style={{ width: 380.5, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle='Bug修复率'
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const extraContent = (
      <div className={"extraContent"}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search className={"extraContentSearch"} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={"listContent"}>
        <div className={"listContentItem"}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={"listContentItem"}>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={"listContentItem"}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={"formResult"}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入任务名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择任务负责人' }],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
          </FormItem>
        </Form>
      );
    };

    return (
      <div className={"standardList"}>
        <Card
          loading={loading}
          className="offlineCard"
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData && offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
                <div style={{ padding: '0 24px' }}>
                  <TimelineChart
                    height={400}
                    data={offlineChartData}
                    titleMap={{
                      y1: 'Bug总数',
                      y2: 'Bug修复数',
                    }}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
        </Card>
        <Card
          className="listCard"
          bordered={false}
          title="团队项目情况"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          extra={extraContent}
        >
          <List
            size="large"
            rowKey="id"
            loading={loading}
            pagination={paginationProps}
            dataSource={projectListData}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  title={<Link to={`/itemDetail/${item.title}`} style={{ backgroundColor: 'red' }}>{item.title}</Link>}
                  // avatar={<Avatar src={item.logo} shape="square" size="large" />}
                  avatar={<Avatar icon="profile" shape="square" size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.subDescription}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
        <Modal
          title={done ? null : `任务${current ? '编辑' : '添加'}`}
          className={"standardListForm"}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </div>
    );
  }
}
