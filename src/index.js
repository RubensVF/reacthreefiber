import { render } from 'react-dom'
import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Html } from 'drei'
import { Block } from './blocks'
import { Shapes, Categories, Box } from './Home'
import state from './store'
import './styles.css'

function HtmlContent({ className, style, children, portal }) {
  const { size } = useThree()
  return (
    <Html
      portal={portal}
      style={{
        position: 'absolute',
        top: -size.height / 2,
        left: -size.width / 2,
        width: size.width,
        height: size.height
      }}>
      <div className={className} style={style}>
        {children}
      </div>
    </Html>
  )
}

function App() {
  const [events, setEvents] = useState()
  const domContent = useRef()
  const scrollArea = useRef()
  const onScroll = (e) => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas
        colorManagement
        gl={{ alpha: false, antialias: true }}
        camera={{ position: [0, 0, 4.5], fov: 50, near: 0.1, far: 100 }}
        onCreated={({ gl, events }) => {
          gl.setClearColor('white')
          gl.toneMappingExposure = 2.5
          gl.toneMappingWhitePoint = 1
          // Export canvas events, we will put them onto the scroll area
          setEvents(events)
        }}>
        <Block factor={1.5} offset={0}>
          <Shapes />
          <HtmlContent portal={domContent}>
            <div className="menu left" style={{ top: '2.55rem' }}>
              <h2 style={{ fontSize: '2em', top: '4rem' }}>Rubs.</h2>
            </div>
            <div className="menu right">
              <a href="google.com">Portfolio</a>
              <a>Personal</a>
            </div>
            <div className="jumbo">
              <h1>
                I'm
                <br />
                Rubén
                <br />
              </h1>
              <Categories />
            </div>
          </HtmlContent>
        </Block>
        <teta></teta>
        <Block factor={1.5} offset={1}>
          <Box />
          <Html center portal={domContent}>
            <h2>I'm a web developer,</h2>
          </Html>
        </Block>

        <Block factor={1.5} offset={2}>
          <Box />
          <Html center portal={domContent}>
            <h2>My skills </h2>
              <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JAVASCRIPT</li>
                <li>SASS</li>
                <li>REACT</li>
                <li>THREE.JS</li>
              </ul>
          </Html>
        </Block>

        <Block factor={-2} offset={4}>
          <Box scale={[2, 2, 2]} />
          <Html center portal={domContent}>
            <h2>Contact me</h2>
          </Html>
        </Block>
      </Canvas>

      <div className="scrollArea" ref={scrollArea} onScroll={onScroll} {...events}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent} />
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  )
}

render(<App />, document.querySelector('#root'))
