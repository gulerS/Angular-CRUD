using FirstAngularCRUD.Models;
using System;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace FirstAngularCRUD.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            
            //Test4
            return View();
        }

        public JsonResult GetAllPersons()
        {
        //test
            Database.SetInitializer(new DropCreateDatabaseIfModelChanges<PersonDbContext>());
            using (PersonDbContext db = new PersonDbContext())
            {
                //for (int i = 0; i < 100; i++)
                //{
                //    db.Persons.Add(new Person()
                //    {
                //        PersonId = i,
                //        FirstName = NameData.GetFirstName(),
                //        LastName = NameData.GetSurname(),
                //        Address = PlaceData.GetAddress(),
                //        IsActive = BooleanData.GetBoolean(),
                //        PhoneNumber = PhoneNumberData.GetInternationalPhoneNumber()
                //    });
                //    db.SaveChanges();
                //}
                return Json(db.Persons.ToList(), JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetPerson(string id)
        {
            using (PersonDbContext db = new PersonDbContext())
            {
                var personId = Convert.ToInt32(id);
                var person = db.Persons.Find(personId);
                return Json(person, JsonRequestBehavior.AllowGet);
            }
        }

        public string AddPerson(Person person)
        {
            if (person != null)
            {
                using (PersonDbContext db = new PersonDbContext())
                {
                    db.Persons.Add(person);
                    db.SaveChanges();
                    return "Person record added successfully";
                }
            }
            else
            {
                return "Invalid person record";
            }
        }

        public string UpdatePerson(Person person)
        {
            if (person != null)
            {
                using (var db = new PersonDbContext())
                {
                    var bookId = Convert.ToInt32(person.PersonId);
                    var _person = db.Persons.FirstOrDefault(b => b.PersonId == bookId);
                    if (_person == null) throw new ArgumentNullException(nameof(_person));
                    _person.PersonId = person.PersonId;
                    _person.FirstName = person.FirstName;
                    _person.LastName = person.LastName;
                    _person.Address = person.Address;
                    _person.IsActive = person.IsActive;
                    _person.PhoneNumber = person.PhoneNumber;

                    db.SaveChanges();
                    return "Person record updated successfully";
                }
            }
            else
            {
                return "Invalid person record";
            }
        }

        public string DeletePerson(string PersonId)
        {
            if (!string.IsNullOrEmpty(PersonId))
            {
                try
                {
                    var personId = Convert.ToInt32(PersonId);
                    using (var db = new PersonDbContext())
                    {
                        var person = db.Persons.Find(personId);
                        db.Persons.Remove(person);
                        db.SaveChanges();
                        return "Selected person record deleted successfully";
                    }
                }
                catch (Exception)
                {
                    return "Book details not found";
                }
            }
            else
            {
                return "Invalid Operation";
            }
        }
    }
}