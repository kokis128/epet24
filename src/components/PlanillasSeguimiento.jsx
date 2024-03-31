import React from 'react'
import { Layout, Typography ,Flex } from 'antd';
import { ClasesList } from '../pages/clasesList/ClasesList';
import { ClasesAdd } from '../pages/clasesList/ClasesAdd';
import { useState } from 'react';
import  { clasesFromDb } from '../constant/Clases'
export const PlanillasSeguimiento = () => {
  const clasesDb= clasesFromDb;

const [listState, setlistState]=useState(clasesDb)
console.log(listState)


  const { Header, Footer, Sider, Content } = Layout;

  
  const headerStyle = {
    textAlign: 'center',
    color: '#fff',    
    paddingInline: 5,
    lineHeight: '120px',
    backgroundColor: '#4096ff',
  };
  const contentStyle = {
    textAlign: 'center',
    minHeight:120,
    lineHeight: '90px',
    color: '#fff',
    backgroundColor: '#0958d9',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#1677ff',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
  };
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: '100%',
    maxHeight:'100%',
  };

  const nClase ={
    tema:'mongoDb',
    numero:12,
    fecha:'2024-03-30',
    observaciones:'clase teórica',
    asistencia:'p',
    id:'2541'
  }

  const updateClase = () => {
    const nArray=[...clasesDb];
    nArray.push(nClase)
   
    setlistState(nArray)
  };


  const delClase = (id) => {
    const nArray = listState.filter(item=>item._id !=id)
    setlistState(nArray)

  }

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          Sider
        </Sider>
        <Content style={contentStyle}>
          <Typography.Title level={1}>Clases</Typography.Title>
          <ClasesAdd updateClase={updateClase}/> 
          
        <ClasesList clases={listState} del={delClase} />
          </Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  )
}
