import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';

export default class MobileSearchForm extends Component {

	searchInput(evt) {
		evt.stopPropagation()
	}

   render() {
      const { isOpen, onClose } = this.props;
      return (
         <div className={classnames("search-form-wrap", { 'search-slide': isOpen })} onClick={onClose}>
            <IconButton className="close-btn text-white" onClick={onClose}>
               <i className="zmdi zmdi-close-circle-o font-2x"></i>
            </IconButton>
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
               <Form>
                  <FormGroup>
                     <Input
                        type="text"
                        placeholder="What Are You Looking For"
                        name="search"
                        id="search-form"
								className="search-input rounded-0"
								onClick={this.searchInput}
                     />
                     <IconButton className="search-btn text-white">
                        <i className="zmdi zmdi-search"></i>
                     </IconButton>
                  </FormGroup>
               </Form>
            </div>
         </div>
      )
   }
};
