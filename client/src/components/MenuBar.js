import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

function MenuBar() {
  const [ activeItem, setActiveItem] = useState('')

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
          />

        </Menu>

      </div>
    )
  }

export default MenuBar