import React from 'react'

const ButtonIcon = ({ type,className, action, Icon, iconClassName,onClick,actionClassName }) => {
  return (
    <>
        {Icon&&
            <button aria-labelledby="icon" type={type} onClick={onClick} className={`${className}`}>
                <Icon className={`${iconClassName}`} />
                <span className={actionClassName}>{action}</span>
            </button>
        }
    </>
  )
}

export default ButtonIcon
