import { ClickerForm } from '../../../app/components/clickerForm/clickerForm';
import { Clickers } from '../../../app/services/clickers';
import { FormBuilder } from 'angular2/common';
import { Utils } from '../../../app/services/utils';

let clickerForm = null;

let mockClickers = Object.create(Clickers);

mockClickers.newClicker = function() { return true; };

export function main() {

  describe('ClickerForm', () => {

    beforeEach(function() {
      clickerForm = new ClickerForm(mockClickers, new FormBuilder());
      spyOn(clickerForm, 'newClicker').and.callThrough();
      spyOn(mockClickers, 'newClicker').and.callThrough();
    });

    it('initialises', () => {
      expect(clickerForm).toBeDefined();
    });

    it('passes new clicker through to service', () => {
      let clickerName = 'dave';
      spyOn(Utils, 'resetControl').and.callThrough();
      clickerForm.clickerNameInput.updateValue(clickerName, true);
      clickerForm.newClicker({clickerNameInput: clickerName});
      expect(clickerForm.newClicker).toHaveBeenCalledWith(Object({ clickerNameInput: clickerName }));
      expect(mockClickers.newClicker).toHaveBeenCalledWith(clickerName);
      expect(Utils.resetControl).toHaveBeenCalledWith(clickerForm.clickerNameInput);
    });

    it('doesn\'t try to add a clicker with no name', () => {
      let rtn = clickerForm.newClicker();
      expect(rtn).toBe(false);
      expect(clickerForm.newClicker).toHaveBeenCalled();
      expect(mockClickers.newClicker).not.toHaveBeenCalled();
    });
  });
}

//
// Waiting for https://github.com/driftyco/ionic/issues/5494 to be released until we can test the form
// When it's out, replace with the below, tested working
//

// import {
//   beforeEach,
//   beforeEachProviders,
//   ComponentFixture,
//   describe,
//   expect,
//   injectAsync,
//   it,
//   TestComponentBuilder,
// }                        from 'angular2/testing';
// import { provide }       from 'angular2/core';
// import {
//   Config,
//   Form,
//   IonicApp,
//   Platform,
// }                        from 'ionic-framework/ionic';
// import { ClickerForm }   from '../../../app/components/clickerForm/clickerForm';
// import { Clickers }      from '../../../app/services/clickers';
// import { Utils }         from '../../../app/services/utils';

// let clickerForm = null;
// let clickerFormFixture = null;

// class MockClickers {
//   public newClicker() {
//     return true;
//   }
// }

// class MockClass {
//   public get(): any {
//     return {};
//   }
// }

// export function main() {

//   describe('ClickerForm', () => {

//     beforeEachProviders(() => [
//       provide(Clickers, {useClass: MockClickers}),
//       Form,
//       provide(IonicApp, {useClass: MockClass}),
//       provide(Platform, {useClass: MockClass}),
//       provide(Config, {useClass: MockClass}),
//     ]);

//     beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
//       return tcb
//         .createAsync(ClickerForm)
//         .then((componentFixture: ComponentFixture) => {
//           clickerFormFixture = componentFixture;
//           clickerForm = componentFixture.componentInstance;
//           spyOn(clickerForm, 'newClicker').and.callThrough();
//           spyOn(clickerForm['clickerService'], 'newClicker').and.callThrough();
//         })
//         .catch(Utils.promiseCatchHandler);
//     }));

//     it('initialises', () => {
//       expect(clickerForm).not.toBeNull();
//     });

//     it('passes new clicker through to service', () => {
//       let clickerName = 'dave';
//       spyOn(Utils, 'resetControl').and.callThrough();
//       clickerForm.clickerNameInput.updateValue(clickerName, true);
//       clickerForm.newClicker({clickerNameInput: clickerName});
//       expect(clickerForm.newClicker).toHaveBeenCalledWith(Object({ clickerNameInput: clickerName }));
//       expect(clickerForm['clickerService'].newClicker).toHaveBeenCalledWith(clickerName);
//       expect(Utils.resetControl).toHaveBeenCalledWith(clickerForm.clickerNameInput);
//     });

//     it('doesn\'t try to add a clicker with no name', () => {
//       let rtn = clickerForm.newClicker();
//       expect(rtn).toBe(false);
//       expect(clickerForm.newClicker).toHaveBeenCalled();
//       expect(clickerForm['clickerService'].newClicker).not.toHaveBeenCalled();
//     });
//   });
// }
