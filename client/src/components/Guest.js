import React from 'react'
import Signin from './Signin'

const Guest = () => {
  return (
    <>
        {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn guest-mode-button btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Guest Mode
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Guest</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    You are a Guest user here.<br />
                    Please login to access this website. <br /><br />
                    <button className='modal-login-button'><a href="/signin">Signin</a></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                </div>
                </div>
            </div>
            </div>
    </>
  )
}

export default Guest