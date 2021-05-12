import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function MenuBar() {
  const [activeItem, setActiveItem] = useState('')

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          </Menu.Menu>

        </Menu>

      </div>
    )
  }

export default MenuBar