using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace FirstAngularCRUD.Models
{
    public class PersonDbContext : DbContext
    {


        public DbSet<Person> Persons { get; set; }
    }
}