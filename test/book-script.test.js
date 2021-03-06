describe('the computeTotal function', function() {
    it('should compute the total correctly', function() {
        $('#room-initial-cost').val('4000.00');
        $('#room-subtract').val('500.00');

        computeTotal();
        assert.equal($('#room-net-cost').val(), '3500.00');
    });
});

describe('the computeBalance function', function() {
    it('should compute the balance correctly', function() {
        $('#room-net-cost').val('4000.00');
        $('#room-payment').val('5000.00');

        computeBalance();
        assert.equal($('#room-balance').val(), '-1000.00');
    });
});

describe('the enableSenior function', function() {
    it('should enable the field when intially disabled', function() {
        $('#is-senior').prop('checked', true);
        enableSenior();
        assert.equal($('#room-senior').is('[readonly]'), false);
    });

    it('should disable the field when intially enabled', function() {
        $('#is-senior').prop('checked', false);
        enableSenior();
        assert.equal($('#room-senior').is('[readonly]'), true);
    });
});

describe('the enablePWD function', function() {
    it('should enable the field when intially disabled', function() {
        $('#is-pwd').prop('checked', true);
        enablePWD();
        assert.equal($('#room-pwd').is('[readonly]'), false);
    });

    it('should disable the field when intially enabled', function() {
        $('#is-pwd').prop('checked', false);
        enablePWD();
        assert.equal($('#room-pwd').is('[readonly]'), true);
    });
});

describe('the enableDiscountPercent function', function() {
    it('should enable the fields when intially disabled', function() {
        $('#is-discount-percent').prop('checked', true);
        enableDiscountPercent();
        expect($('#room-discount-reason-percent').is('[readonly]')).to.equal($('#room-discount-percent').is('[readonly]')).and
        .equal(false);
    });

    it('should disable the fields when intially enabled', function() {
        $('#is-discount-percent').prop('checked', false);
        enableDiscountPercent();
        expect($('#room-discount-reason-percent').is('[readonly]')).to.equal($('#room-discount-percent').is('[readonly]')).and
        .equal(true);
    });
});

// NOTE: unable to go to /room path because server is not started
// describe('the computeInitialCost function', function() {
//     it('should compute the rate based on dates correctly', function(){
//         // room 407
//         $('#room-id').val('611a2b62687236173c223ae2');
//         $('#room-pax').val('2');
//         $('#start-date').val('2021-08-01');
//         $('#end-date').val('2021-08-03');
//         $('#room-extra').val('');
//         computeInitialCost();

//         assert
//         .equal($('#duration').val(), '2')
//         .and.equal($('#room-initial-cost').val(), '3600.00')
//         .and.equal($('#room-rate').val(), '1800.00');
//     });

//     it('should set fields to 0 when room-id is invalid', function(){
//         $('#room-id').val('611a2b62687237273c223ae2');
//         $('#room-pax').val('2');
//         $('#start-date').val('2021-08-01');
//         $('#end-date').val('2021-08-03');
//         $('#room-extra').val('');
//         computeInitialCost();

//         assert
//         .equal($('#duration').val(), '0')
//         .and.equal($('#room-initial-cost').val(), '0.00')
//         .and.equal($('#room-rate').val(), '0.00');
//     });
// });