import React from 'react';
import {Link} from '@react-spectrum/link';

export default ({children, ...props}) => (
  <Link>
    <a {...props}>{children}</a>
  </Link>
)