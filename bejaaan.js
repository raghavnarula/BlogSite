{/* <div style="margin:3vh 0px 0%;">
    <form action="/api/user/" method="POST">
        <div class="row mx-2">
            <div class="form-group col-lg-6">
                <label for="batch">Name of The Product</label>
                <input placeholder="Tigacycline" type="text" name="name_of_product" required="true"  class="form-control">
            </div>
            
            <div class="form-group col-lg-6">
                <label for="batch">Batch Number</label>
                <input required="true"  class="form-control" placeholder="A102GC" name="batch_number" type="text">    
            </div>
        </div>
            
        <div class="row mx-2">
            <div class="form-group col-lg-6 ">
                <label for="mfg_date">Manufacturing Date</label>
                <input required="true"  class="form-control" placeholder="02-02-2022" name="manufacturing_date" type="date">
            </div>
            
            <div class="form-group col-lg-6">
                <label for="exp_date">Expiry Date</label>
                <input required="true"  class="form-control" placeholder="02-02-2022" name="expiry_date" type="date">
            </div>
        </div>
            
        <div class="row mx-2">
            <div class="form-group col-4">
                <label for="gross_wght">Gross Weight <b>(kg)</b></label>
                <input required="true"  class="form-control" placeholder="40" name="gross_weight" type="number">
            </div>
            
            
            <div class="form-group col-4">     
                <label for="tare_wght">Tare Weight <b>(kg)</b></label>
                <input required="true"  class="form-control" placeholder="30" name="tare_weight" type="number">
            </div>
            
            <div class="form-group col-4">
                <label for="net_wght">Net Weight <b>(kg)</b></label>
                <input required="true"  class="form-control" placeholder="400" name="net_weight" type="number">
            </div>

        </div>

        <div class="row mx-2">
            <div class="form-group col-sm-6">
                <label for="mfg_lcn_no">Manufacturing Licence Number</label>
                <input required="true"  class="form-control" placeholder="ABCD" name="manufacturing_licence_number" type="text">
            </div>
            <div class="form-group col-sm-6">
                <label for="strg_condn">Storage Condition</label>
                <input required="true"  class="form-control" placeholder="cold" name="storage_condition" type="text">
            </div>
            
        </div>

        <div class="row mx-2">
            <div class="form-group col-5">
                <label for="no_container">No. of Container</label>
                <input required="true"  class="form-control" placeholder="4" name="number_of_container"  type="number">
            </div>    
            
            <div class="form-group col-7">
                <label for="orgn">Origin</label>
                <input required="true"  class="form-control" placeholder="India" name="origin" type="text">
            </div>
        </div>
            
        <div class="row mx-2 col-12">
            <button class="btn btn-primary" type="submit">Submit</button>
        </div>
    </form>   
</div>



$('#form').submit(function(eventObj) {
    $(this).append('<input type="hidden" name="field_name" value="value" /> ');
    return true;
}); */}
