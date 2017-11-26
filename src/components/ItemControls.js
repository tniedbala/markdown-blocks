import React from 'react';

// clickable list item
const ListSelect = (props) => {
  return (
    <li>
      <a 
        type={props.type}
        href={props.href}
        download={props.download}           
        onClick={props.click}
      >
        { props.content }
      </a>
    </li>
  );
}

// list item dropdown
const ListDropdown = (props) => {
  return (
    <ul className="dropdown-menu">
      { props.dropdownItems.map(item => <ListSelect {...item} />) }
    </ul>
  );
}

// clickable glyphicon
const Glyphicon = (props) => {
  return (
    <span 
      id={props.id}
      title={props.title} 
      className={`${props.className} glyphicon glyphicon-${props.glyph}`}
      onClick={props.click} 
    />
  );
}

// glyphicon button
const GlyphButton = (props) => {
  return (
    <ListSelect content={
      <Glyphicon { ...props} /> 
    }/>
  );
}

// glypicon dropdown menu
const GlyphDropdown = (props) => {
  return(
    <li className="dropdown">
      <a  
        className="dropdown-toggle" 
        data-toggle="dropdown" 
        role="button" 
        aria-haspopup="true" 
        aria-expanded="false"
      >
        <Glyphicon title={props.title} glyph={props.glyph} />
      </a>
      <ListDropdown dropdownItems={props.dropdownItems} />
    </li>
  )
}

module.exports = {
  ListSelect,
  ListDropdown,
  Glyphicon,
  GlyphButton,
  GlyphDropdown
}