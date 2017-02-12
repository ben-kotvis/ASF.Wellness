using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation.Results;
using System.Threading;
using FluentValidation.Validators;

namespace ASF.Wellness.Participant.Domain.Validation
{
    public class PaticipationsValidator : AbstractValidator<Participations>
    {
        public PaticipationsValidator()
        {
            Custom(p => CheckMonthlyTotals(p));
        }

        private ValidationFailure CheckMonthlyTotals(Participations participations)
        {
            var activities = participations.Activities.Where(i => !i.Approved).Select(i => new { Month = i.Date.Month, Year = i.Date.Year, Points = i.Points });

            var events = participations.Events.Where(i => !i.Approved).Select(i => new { Month = i.Date.Month, Year = i.Date.Year, Points = i.Points });

            var combined = events.Union(activities);

            foreach(var item in combined.GroupBy(i => new { i.Year, i.Month }))
            {
                if(item.Sum(i => i.Points) > 12)
                {
                    return new ValidationFailure("Activities", "Too many points per month");
                }
            }


            return default(ValidationFailure);
        }
        
    }
    
}
